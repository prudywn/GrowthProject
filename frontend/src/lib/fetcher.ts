import { sanityClient } from "@/lib/sanity";
import { getAllPostsQuery, getHomepageContentQuery } from "./queries";
import {
  getAboutPageContentQuery,
  getAllCoreValuesQuery,
  getAllCourseLessonsQuery,
  getAllTeamMembersQuery,
  getAllTestimonialsQuery,
  getAllTrustedClientsQuery,
  getWhyUsContentQuery,
  getAllWhyUsPointsQuery,
  getMainCoursesQuery,
  getAllCoursesQuery,
  getCourseBySlugQuery,
  getAllCourseCategoriesQuery,
  getMainServicesQuery,
  getAllServicesQuery,
  getServiceBySlugQuery,
  getAllServiceCategoriesQuery
} from "./queries";

export const fetchHomepageContent = async () => {
  return await sanityClient.fetch(getHomepageContentQuery);
};

export const fetchArticles = async () => {
  return await sanityClient.fetch(getAllPostsQuery);
};

export const fetchAboutPageContent = async () => {
  return await sanityClient.fetch(getAboutPageContentQuery);
};

export const fetchCoreValues = async () => {
  return await sanityClient.fetch(getAllCoreValuesQuery);
};

export const fetchCourseLessons = async () => {
  return await sanityClient.fetch(getAllCourseLessonsQuery);
};

export const fetchTeamMembers = async () => {
  return await sanityClient.fetch(getAllTeamMembersQuery);
};

export const fetchTestimonials = async () => {
  return await sanityClient.fetch(getAllTestimonialsQuery);
};

export const fetchTrustedClients = async () => {
  return await sanityClient.fetch(getAllTrustedClientsQuery);
};

export const fetchWhyUsContent = async () => {
  return await sanityClient.fetch(getWhyUsContentQuery);
};

export const fetchWhyUsPoints = async () => {
  return await sanityClient.fetch(getAllWhyUsPointsQuery);
};

export const fetchMainCourses = async () => {
  return await sanityClient.fetch(getMainCoursesQuery);
};

export const fetchAllCourses = async () => {
  return await sanityClient.fetch(getAllCoursesQuery);
};

export const fetchCourseBySlug = async (slug: string) => {
  return await sanityClient.fetch(getCourseBySlugQuery, { slug });
};

export const fetchCourseCategories = async () => {
  return await sanityClient.fetch(getAllCourseCategoriesQuery);
};

export const fetchMainServices = async () => {
  return await sanityClient.fetch(getMainServicesQuery);
};

export const fetchAllServices = async () => {
  return await sanityClient.fetch(getAllServicesQuery);
};

export const fetchServiceBySlug = async (slug: string) => {
  console.log('Fetching service with slug:', slug);
  const result = await sanityClient.fetch(getServiceBySlugQuery, { slug });
  console.log('Service fetch result:', result);
  return result;
};

export const fetchServiceCategories = async () => {
  return await sanityClient.fetch(getAllServiceCategoriesQuery);
};
