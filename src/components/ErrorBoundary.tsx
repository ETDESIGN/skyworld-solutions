import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" strokeWidth={1.5} />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
              An unexpected error occurred. Our team has been notified.
            </p>

            {/* Error details (collapsed, full stack in dev only) */}
            {this.state.error && (
              <details className="mb-8 text-left">
                <summary className="text-sm text-slate-500 dark:text-slate-500 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  Error details
                </summary>
                <pre className="mt-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 overflow-auto max-h-40 border border-slate-200 dark:border-slate-700/50">
                  {this.state.error.message}
                  {import.meta.env.DEV && this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 hover:border-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:border-slate-500 transition-all duration-300"
              >
                Try again
              </button>
              <button
                onClick={this.handleReload}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
