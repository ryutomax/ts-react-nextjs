import Swal from "sweetalert2";

export function Alert(displayText: string) {
  Swal.fire({
    icon: "warning",
    title: "入力エラー",
    text: displayText,
    confirmButtonText: "OK",
    // toast: true,
    // position: 'top-end'
  });
} 