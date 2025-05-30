import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { Loader2 } from 'lucide-react'; // Example: If a loading spinner is desired

// Define Zod schema for form validation
const formSchema = z.object({
  username: z.string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  className?: string;
  // onLoginSuccess?: (data: LoginFormValues) => void; // Example callback for successful login
  // onNavigateToSignUp?: () => void; // Example callback for sign-up navigation
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login attempt with:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Dummy validation logic
    if (data.username === 'testuser' && data.password === 'password123') {
      console.log('Login successful');
      // Call onLoginSuccess prop if provided
      // props.onLoginSuccess?.(data);
    } else {
      console.log('Login failed: Invalid credentials');
      // Set a general error for the form, or specific field errors
      form.setError('root.serverError', {
        type: 'manual',
        message: 'Invalid username or password. Please try again.',
      });
      // Alternatively, for specific fields:
      // form.setError('username', { type: 'manual', message: 'Incorrect username.' });
      // form.setError('password', { type: 'manual', message: 'Incorrect password.' });
    }
    setIsLoading(false);
  };

  const handleSignUpClick = React.useCallback(() => {
    if (isLoading) return;
    console.log("Navigate to Sign Up page/modal");
    // Call onNavigateToSignUp prop if provided
    // props.onNavigateToSignUp?.();
  }, [isLoading]);

  return (
    <div className={cn(
      "flex flex-col bg-card text-card-foreground rounded-lg shadow-lg p-6 w-[320px]",
      className
    )}>
      <h1 className="text-2xl font-bold text-center mb-6 text-card-foreground">Log in</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Username" 
                    {...field} 
                    className="bg-card border-input text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                    className="bg-card border-input text-card-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root?.serverError && (
            <FormMessage className="text-destructive">
              {form.formState.errors.root.serverError.message}
            </FormMessage>
          )}
          <Button 
            type="submit" 
            variant="default" // Uses primary color by default from theme
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                Logging in...
              </>
            ) : (
              'Log in'
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center">
        <Button 
          variant="link" 
          type="button" // Ensure it doesn't submit the form
          className="text-sm text-muted-foreground hover:text-primary h-auto p-0"
          onClick={handleSignUpClick}
          disabled={isLoading}
        >
          or, sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
