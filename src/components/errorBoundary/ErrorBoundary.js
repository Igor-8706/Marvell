import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // // встроенный метод, изменяющий только стейт при ошибке
    // static getDerivedStateFromError(error) {
    //     return {error:true}
    // }

    componentDidCatch(error, errorInfo){
        this.setState({
            error:true
        })
    }

    render() {
        if (this.state.error === true){
            <ErrorMessage/>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;