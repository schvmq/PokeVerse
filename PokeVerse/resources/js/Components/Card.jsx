export default function Card({ className = '', children, ...props }) {
    return (
        <div
            {...props}
            className={
                `bg-white rounded-xl shadow-pokemon border border-gray-100 p-6 ${className}`
            }
        >
            {children}
        </div>
    );
}
