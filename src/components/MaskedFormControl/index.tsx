import { IMaskMixin } from "react-imask";
import Form from "react-bootstrap/Form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MaskedFormControl = IMaskMixin(({ inputRef, mask, ...props }: any) => (
	<Form.Control mask={mask} {...props} ref={inputRef} />
));
