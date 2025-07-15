import { Stack, Button, Card, Spinner, Text, Tooltip, Box } from '@sanity/ui';
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

// Get character limit from validation rules
const getCharacterLimit = (schemaType: any): number | null => {
  if (schemaType.validation) {
    const validationRules = schemaType.validation(null);
    for (const rule of validationRules._rules || []) {
      if (rule.flag === 'max') {
        return rule.constraint;
      }
    }
  }
  return null;
};

export function AiSuggestInput(props: StringInputProps) {
  const { schemaType, value = '', onChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const document = useFormValue([]) as Record<string, any>;
  const fieldType = getFieldType(schemaType);
  const hasContent = typeof value === 'string' && value.trim().length > 0;
  const charLimit = getCharacterLimit(schemaType);
  
  // Calculate character count and status
  const characterStats = useMemo(() => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    if (!charLimit) return null;
    
    const percentage = (currentLength / charLimit) * 100;
    let status: 'success' | 'warning' | 'critical' = 'success';
    
    if (percentage >= 90) {
      status = 'critical';
    } else if (percentage >= 75) {
      status = 'warning';
    }
    
    return {
      current: currentLength,
      max: charLimit,
      percentage,
      status
    };
  }, [value, charLimit]);

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

      {/* Character Counter */}
      {characterStats && (
        <Box paddingTop={1}>
          <Text 
            size={1} 
            tone={characterStats.status}
            style={{ 
              float: 'right',
              fontWeight: characterStats.status === 'critical' ? 'bold' : 'normal'
            }}
          >
            {characterStats.current}/{characterStats.max} characters
            {characterStats.status === 'critical' && ' (limit exceeded)'}
          </Text>
        </Box>
      )}

      {error && (
        <Card padding={2} tone="critical">
          <Text size={1} align="right">{error}</Text>
        </Card>
      )}
    </Stack>
  );
}
