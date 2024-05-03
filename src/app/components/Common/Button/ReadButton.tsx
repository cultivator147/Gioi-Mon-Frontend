import './buttonStyles.css';

export const ReadButton = ({children, ...props} : any) => {
    return <button
    className="btn-redbrown"
    {...props}
    >
        {children}
    </button>
}