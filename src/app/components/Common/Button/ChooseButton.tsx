import './buttonStyles.css';

export const ChooseButton = ({children, ...props} : any) => {
    return <button
    className="btn-redpink"
    {...props}
    >
        {children}
    </button>
}