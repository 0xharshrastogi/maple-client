export function parseUser(currentUser) {
  return {
    firstname: currentUser.getName(),
    imageURL: currentUser.getImageUrl(),
    email: currentUser.getEmail(),
    userId: currentUser.getId(),
    familyname: currentUser.getFamilyName(),
    givenName: currentUser.getGivenName(),
  };
}
