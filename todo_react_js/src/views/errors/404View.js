import '../../assets/error.scss';
import ExclamationLogo from '../../components/icons/exclamation';
export default function Error404View(){
    return (
        <div class="error error-404">
            <h1>404</h1>
            <ExclamationLogo class="error-logo"/>
            <h1>Page Not Found</h1>
        </div>
    );
}
