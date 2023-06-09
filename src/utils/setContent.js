import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton'

// машина состояний - принимает только одно состояние, в зависимости от которого генерируется нужный контент
const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>  
            break;
        case 'loading':
            return <Spinner/>
            break;
        case 'confirmed' :
            return <Component data={data}/>
            break;
        case 'error' :
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected process state')
            break;
    }
}

export default setContent;