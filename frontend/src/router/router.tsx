/* eslint-disable react-refresh/only-export-components -- centralized lazy route definitions, not a component module */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { LoadingState } from "../components/shared/LoadingState";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const BlogListPage = lazy(() => import("../pages/Blog/BlogListPage"));
const BlogDetailPage = lazy(() => import("../pages/Blog/BlogDetailPage"));
const ProjectListPage = lazy(() => import("../pages/Projects/ProjectListPage"));
const ProjectDetailPage = lazy(
  () => import("../pages/Projects/ProjectDetailPage"),
);
const CvPage = lazy(() => import("../pages/Cv/CvPage"));
const ContactPage = lazy(() => import("../pages/Contact/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFoundPage"));

const fallback = <LoadingState minHeight="60vh" />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={fallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={fallback}>
            <BlogListPage />
          </Suspense>
        ),
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={fallback}>
            <BlogDetailPage />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={fallback}>
            <ProjectListPage />
          </Suspense>
        ),
      },
      {
        path: "projects/:slug",
        element: (
          <Suspense fallback={fallback}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: "cv",
        element: (
          <Suspense fallback={fallback}>
            <CvPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={fallback}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={fallback}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
