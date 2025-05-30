import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import LoginForm from '../components/Login/LoginForm';

/**
 * LoginPage serves as the main entry point for the login screen.
 * It utilizes MainAppLayout to provide the overall page structure (centered content on a full-screen background)
 * and embeds the LoginForm component, which contains the actual form fields and logic.
 */
const LoginPage: React.FC = () => {
  return (
    <MainAppLayout title="Log In - Login Page UI"> 
      {/* 
        The MainAppLayout handles the overall page centering and background color.
        The LoginForm component is passed as children. It is responsible for its own
        card-like appearance (background, padding, shadow, width) and form elements.
        This composition aligns with the project's component hierarchy and layout requirements.
      */}
      <LoginForm />
    </MainAppLayout>
  );
};

export default LoginPage;
