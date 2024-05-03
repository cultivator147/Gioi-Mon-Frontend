import './buttonStyles.css';

export const SelectButton = ({children, ...props} : any) => {
    return <button
    className="btn-grad"
    {...props}
    >
        {children}
    </button>
}