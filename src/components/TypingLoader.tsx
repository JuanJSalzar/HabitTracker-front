import {motion} from 'framer-motion';

const TypingLoader = () => {
    return (
        <div className="flex items-center space-x-1">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 bg-gray-600 rounded-full"
                    animate={{y: [0, -3, 0]}}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
};

export default TypingLoader;
