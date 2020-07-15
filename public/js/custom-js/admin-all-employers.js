var $rows = $('#table #table-row');
$('#search').keyup(function() {
  var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $rows.show().filter(function() {
      var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
      return !~text.indexOf(val);
  }).hide();
});

function toApprove(employerId, employerName, csrf, token) {
  console.log(csrf);
  swal({
    title: `Are you sure you want to disapprove ${employerName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/admin/verify/employer/${employerId}`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          Authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Approved!',
        text: `${employerName} successfully approved!`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/all/employers';
      });
    }
  });
}

function toDisapprove(employerId, employerName, csrf, token) {
  swal({
    title: `Are you sure you want to disapprove ${employerName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/admin/unverify/employer/${employerId}`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          Authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Disapproved!',
        text: `${employerName} successfully disapproved!`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/all/employers';
      });
    }
  });
}

function toBlock(userId, employerName, csrf, token) {
  swal({
    title: `Are you sure you want to block ${employerName}?`,
    type: 'error',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/admin/block/employer/${userId}`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          Authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Blocked!',
        text: `You have successfully blocked ${employerName}`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/all/employers';
      });
    }
  });
}

function toUnblock(userId, employeeName, csrf, token) {
  swal({
    title: `Are you sure you want to Unblock ${employeeName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/admin/unblock/employer/${userId}`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          Authorization: token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Unblocked!',
        text: `You have successfully unblocked ${employeeName}`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/all/employers';
      });
    }
  });
}
