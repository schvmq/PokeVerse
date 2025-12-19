export default function SecondaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-pokemon-blue bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-pokemon-blue transition duration-150 ease-in-out hover:bg-pokemon-blue hover:text-white focus:bg-pokemon-blue focus:text-white focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 active:bg-pokemon-indigo ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
