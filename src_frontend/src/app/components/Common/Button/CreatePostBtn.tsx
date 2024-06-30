import './buttonStyles.css';

export const CreatePostBtn = ({children, ...props} : any) => {
    return <button
    className="btn-createpost"
    {...props}
    >
        {children}
    </button>
}