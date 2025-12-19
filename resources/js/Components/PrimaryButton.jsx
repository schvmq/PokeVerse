export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-transparent bg-gradient-to-r from-pokemon-blue to-pokemon-teal px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:from-pokemon-indigo hover:to-pokemon-blue focus:from-pokemon-indigo focus:to-pokemon-blue focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:ring-offset-2 active:from-pokemon-dark active:to-pokemon-indigo ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
