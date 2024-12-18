import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // @TODO: Add logger
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  handleRetry = (): void => {
    // Reset the error state and retry rendering the children
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Oops! Something went wrong.</h1>
          <p style={styles.message}>{error?.message || "An error occurred."}</p>
          <button style={styles.retryButton} onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Styles for fallback UI
const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "20%",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  retryButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ErrorBoundary;
