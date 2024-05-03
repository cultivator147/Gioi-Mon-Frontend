import './buttonStyles.css';

export const ContinueReadingBtn = ({children, ...props} : any) => {
    return <button
    className="btn-redpink2"
    {...props}
    >
        {children}
    </button>
}