const $rows = $('#table #table-row');
$('#search').keyup(function () {
  const val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $rows.show().filter(function () {
    const text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    return !~text.indexOf(val);
  }).hide();
});

function toApprove(employeeId, employeeName) {
  swal({
    title: `Are you sure you want to approve ${employeeName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/admin/verify/employee/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Approved!',
        text: `You successfully approved ${employeeName}!`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/employees';
      });
    }
  });
}

function toDisapprove(employeeId, employeeName) {
  swal({
    title: `Are you sure you want to disapprove ${employeeName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/admin/unverify/employee/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Disapproved!',
        text: `You have successfully disapproved ${employeeName}!`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/employees';
      });
    }
  });
}

function toBlock(userId, employeeName) {
  swal({
    title: `Are you sure you want to block ${employeeName}?`,
    type: 'error',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/admin/block/employee/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Blocked!',
        text: `You have successfully blocked ${employeeName}`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/employees';
      });
    }
  });
}

function toUnblock(userId, employeeName) {
  swal({
    title: `Are you sure you want to Unblock ${employeeName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/admin/unblock/employee/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Unblocked!',
        text: `You have successfully Unblocked ${employeeName}`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/employees';
      });
    }
  });
}
