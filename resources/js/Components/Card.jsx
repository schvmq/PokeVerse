import { motion } from 'framer-motion';

export default function Card({ className = '', children, ...props }) {
    return (
        <motion.div
            {...props}
            className={
                `bg-white rounded-xl shadow-pokemon border border-gray-100 p-6 ${className}`
            }
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}
