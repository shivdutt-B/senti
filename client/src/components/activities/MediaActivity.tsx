import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImage, FaPhotoVideo, FaPlayCircle } from 'react-icons/fa';
import { ActivityButton } from '../home/ActivityButton';

const mediaTypes = [
	{
		id: 'image',
		title: 'Fun Images',
		icon: FaImage,
		color: 'from-indigo-400 to-indigo-600',
		hoverColor: 'hover:from-indigo-500 hover:to-indigo-700',
		description: 'Discover feelings in pictures! 🖼️',
	},
	{
		id: 'gif',
		title: 'Cool GIFs',
		icon: FaPhotoVideo,
		color: 'from-cyan-400 to-cyan-600',
		hoverColor: 'hover:from-cyan-500 hover:to-cyan-700',
		description: 'Find emotions in moving pictures! 🎭',
	},
	{
		id: 'video',
		title: 'Video Time',
		icon: FaPlayCircle,
		color: 'from-teal-400 to-teal-600',
		hoverColor: 'hover:from-teal-500 hover:to-teal-700',
		description: 'Learn from fun videos! 🎥',
	},
];

export function MediaActivity() {
	const navigate = useNavigate();

	const handleMediaSelect = (mediaTypeId: string) => {
		navigate(`/activity/media/${mediaTypeId}`);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-4 md:p-8 relative overflow-hidden">
			{/* Background animations */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-10 left-10 w-20 h-20 bg-indigo-300/20 rounded-full animate-pulse delay-100"></div>
				<div className="absolute top-32 right-20 w-16 h-16 bg-cyan-300/20 rounded-full animate-pulse delay-300"></div>
				<div className="absolute bottom-40 left-20 w-24 h-24 bg-teal-300/20 rounded-full animate-pulse delay-500"></div>
				<div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse delay-700"></div>
			</div>

			<div className="max-w-4xl mx-auto relative z-10">
				<div className="flex items-center mb-8">
					<button
						onClick={() => navigate('/')}
						className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300 font-semibold text-gray-700"
					>
						<FaArrowLeft /> Back to Home
					</button>
				</div>

				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-fredoka font-extrabold text-gray-800 mb-4">
						🎨 Picture Magic World! 🌟
					</h1>
					<p className="text-xl md:text-2xl font-comic text-gray-700 font-bold">
						Choose your magical adventure!
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{mediaTypes.map((mediaType, index) => (
						<div
							key={mediaType.id}
							className="animate-float"
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							<ActivityButton
								id={mediaType.id}
								icon={mediaType.icon}
								title={mediaType.title}
								description={mediaType.description}
								color={mediaType.color}
								hoverColor={mediaType.hoverColor}
								onClick={() => handleMediaSelect(mediaType.id)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
