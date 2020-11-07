import React from 'react'
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: false}
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div role="alert">
          <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
