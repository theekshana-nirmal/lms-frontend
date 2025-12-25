import { getRoleDisplayName } from "@/constants/roles";

/**
 * ProfileSection component displays user profile information
 * @param {Object} props
 * @param {Object} props.user - User object containing profile data
 * @returns {JSX.Element}
 */
const ProfileSection = ({ user }) => {
    if (!user) {
        return (
            <main className="flex max-h-fit gap-8 grow container mx-auto px-4 py-8 items-center bg-accent rounded-2xl">
                <p>No user data available.</p>
            </main>
        );
    }

    return (
        <main className="flex max-h-fit gap-8 grow container mx-auto px-4 py-8 items-center bg-accent rounded-2xl">
            {/* Profile Photo */}
            <div className="flex justify-center">
                {user.profilePhotoUrl ? (
                    <img
                        src={user.profilePhotoUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                ) : (
                    <p>No profile photo available.</p>
                )}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col max-h-fit">
                <h1 className="text-3xl font-bold">
                    {getRoleDisplayName(user.role)} Dashboard
                </h1>
                <p>Welcome, {user.firstName} {user.lastName}!</p>
            </div>
        </main>
    );
};

export default ProfileSection;
