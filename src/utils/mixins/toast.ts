import Swal from "sweetalert2";

export const Toast = Swal.mixin({
	toast: true,
	timer: 3000,
	position: "top-right",
	timerProgressBar: true,
	showConfirmButton: false,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	}
});
