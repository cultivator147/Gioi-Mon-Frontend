import './buttonStyles.css';

export const ReadnowButton = ({children, ...props} : any) => {
    return <button
    className="btn-readnow"
    {...props}
    >
        {children}
    </button>
}