import { Link } from 'react-router-dom';

const ErrorLayout = () => {
  return (
    <div className="h-screen w-screen bg-c-yel pt-24">
      <div className="container m-auto flex flex-col gap-3 px-8">
        <h1 className="text-center text-4xl font-bold">404 Page not found</h1>
        <p className="text-center text-lg px-4">MealSprint is Sorry, we couldn't find the page you're looking for.</p>
        <Link to="/" className="mt-4">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorLayout;
