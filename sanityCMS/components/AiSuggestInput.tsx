import { Stack, Button, Card, Spinner, Text, Tooltip } from '@sanity/ui';
import { set, unset, useFormValue, StringInputProps } from 'sanity';
import { useState, useMemo } from 'react';
import { FiMic, FiRefreshCw } from 'react-icons/fi';

// The backend URL where our AI endpoint is hosted
const API_ENDPOINT = process.env.SANITY_STUDIO_BACKEND_API_ENDPOINT || 'http://localhost:3001/api/v1/ai/suggest';

// Map Sanity schema types to our field types
const getFieldType = (schemaType: any): string => {
  if (schemaType.name === 'text') return 'text';
  if (schemaType.name === 'string') {
    if (schemaType.options?.list?.length) return 'select';
    return 'string';
  }
  if (schemaType.name === 'blockContent') return 'blockContent';
  if (schemaType.name === 'title') return 'title';
  if (schemaType.name === 'description') return 'description';
  return 'string';
};

export function AiSuggestInput(props: StringInputProps) {
  const { schemaType, value = '', onChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const document = useFormValue([]) as Record<string, any>;
  const fieldType = getFieldType(schemaType);
  const hasContent = typeof value === 'string' && value.trim().length > 0;

  // --- Word Counter Logic ---
  // Try to extract max word count from validation rules
  const maxWords = useMemo(() => {
    if (schemaType?.validation) {
      // Try to find a .max() call in the validation chain
      // Sanity's validation is a function: Rule => Rule.required().min(30).max(200)
      // We can try to parse the function as a string
      const fnStr = schemaType.validation.toString();
      const match = fnStr.match(/max\((\d+)\)/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    return 200; // fallback default
  }, [schemaType]);

  const wordCount = typeof value === 'string' ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const wordsRemaining = maxWords - wordCount;
  const overLimit = wordCount > maxWords;
  // --- End Word Counter Logic ---

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fieldName: schemaType.name,
          fieldType,
          currentValue: value || '',
          document,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || 'Failed to generate suggestion');
      }

      const data = await res.json();
      const suggestion = data.suggestion;

      if (suggestion) {
        if (fieldType === 'blockContent') {
          const blockContentValue = [
            {
              _type: 'block',
              _key: Math.random().toString(36).substring(2, 15),
              children: [
                {
                  _type: 'span',
                  _key: Math.random().toString(36).substring(2, 15),
                  text: suggestion,
                },
              ],
              markDefs: [],
              style: 'normal',
            },
          ];
          onChange(set(blockContentValue));
        } else {
          onChange(set(suggestion));
        }
      } else {
        onChange(unset());
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('AI generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack space={3}>
      <div style={{ position: 'relative' }}>
        {/* Correct default input rendering */}
        {props.renderDefault(props)}

        {/* AI Suggest Button */}
        <div
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
            zIndex: 10,
          }}
        >
          <Tooltip
            content={
              <Card padding={2} radius={2}>
                <Text size={1}>
                  {hasContent ? 'Improve content with AI' : 'Generate with AI'}
                </Text>
              </Card>
            }
            portal
            placement="top"
          >
            <Button
              icon={isLoading ? Spinner : hasContent ? FiRefreshCw : FiMic}
              mode="bleed"
              fontSize={1}
              padding={2}
              style={{ cursor: isLoading ? 'wait' : 'pointer' }}
              onClick={handleGenerate}
              disabled={isLoading}
              title={hasContent ? 'Improve content' : 'Generate content'}
            />
          </Tooltip>
        </div>
      </div>

      {/* Word Counter */}
      <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
        <Text size={1} style={{ color: overLimit ? 'red' : '#888' }}>
          {overLimit
            ? `${Math.abs(wordsRemaining)} word${Math.abs(wordsRemaining) !== 1 ? 's' : ''} over the limit (${maxWords})`
            : `${wordsRemaining} word${Math.abs(wordsRemaining) !== 1 ? 's' : ''} remaining`}
        </Text>
      </div>

      {error && (
        <Card padding={2} tone="critical">
          <Text size={1} align="right">{error}</Text>
        </Card>
      )}
    </Stack>
  );
}
