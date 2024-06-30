import './buttonStyles.css';

export const SearchButton = ({children, ...props} : any) => {
    return <button
    className="btn-grad-tiny"
    {...props}
    >
        {children}
    </button>
}