import Swal from 'sweetalert2'

export const showSuccess = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'success',
    confirmButtonColor: 'hsl(222.2 47.4% 11.2%)',
    timer: 2000,
    timerProgressBar: true
  })
}

export const showError = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonColor: 'hsl(222.2 47.4% 11.2%)'
  })
}

export const showConfirm = (title: string, message: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'hsl(222.2 47.4% 11.2%)',
    cancelButtonColor: 'hsl(0 84.2% 60.2%)',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  })
}

