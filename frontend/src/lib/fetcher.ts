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
  getAllCoursesQuery
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
