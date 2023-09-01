import React, { ReactNode } from 'react';

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

type RenderFallbackType<ErrorType extends Error = Error> = (
  props: RenderFallbackProps<ErrorType>
) => ReactNode;

export type Props<ErrorType extends Error = Error> = {
  children?: ReactNode;
  renderFallback: RenderFallbackType<ErrorType>;
};

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null;
}

const initialState: State<any> = {
  error: null,
};

export class ErrorBoundary<
  ErrorType extends Error = Error,
> extends React.Component<Props<ErrorType>, State<ErrorType>> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  resetErrorBoundary = () => {
    this.setState(initialState);
  };

  render() {
    const { children, renderFallback } = this.props;
    const { error } = this.state;

    if (error != null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }
    return children;
  }
}
