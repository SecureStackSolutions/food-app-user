export const getVerificationCode = () =>
	Math.floor(Math.random() * 9001) + 1000;
export const getFutureDate = (args: { seconds?: number; days?: number }) => {
	if (args.seconds) {
		return new Date(Date.now() + args.seconds * 1000);
	} else if (args.days) {
		return new Date(Date.now() + args.days * 1000 * 60 * 60 * 24);
	}
};
