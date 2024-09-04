/**
 * Generates an avatar name based on the first letter of the first name and the first letter of the last name.
 * If either name is empty, it will be ignored.
 * @param firstName The user's first name.
 * @param lastName The user's last name.
 * @returns The generated avatar name.
 */
function GenerateAvatarName(firstName: string, lastName: string) {
    const sanitizedFirstName = firstName ? firstName.trim() : "";
    const sanitizedLastName = lastName ? lastName.trim() : "";

    // Use the first letters of both names
    return sanitizedFirstName.charAt(0) + sanitizedLastName.charAt(0);
}

export default GenerateAvatarName