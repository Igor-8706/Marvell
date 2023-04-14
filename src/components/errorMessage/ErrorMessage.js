import img from './error.gif'

const ErrorMessage = () => {
    return (
        // работа с внешним окружением, если картинка в папке public забираем ее оттуда
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt = 'error'/>

        <img style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto' }}
            src={img} alt='error' />
    )
}

export default ErrorMessage;