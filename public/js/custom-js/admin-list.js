const $rows = $('#table #table-row');
$('#search').keyup(function () {
  const val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $rows.show().filter(function () {
    const text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    return !~text.indexOf(val);
  }).hide();
});

function toBlock(userId, adminName, csrf) {
  swal({
    title: `Are you sure you want to block ${adminName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/superadmin/${userId}/block`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(() => {
        swal({
          title: 'Blocked!',
          text: `You have successfully blocked ${adminName}`,
          type: 'success',
        }).then(() => {
          window.location = '/admin/lists';
        });
      });
    }
  });
}

function toUnblock(userId, adminName, csrf) {
  swal({
    title: `Are you sure you want to Unblock ${adminName}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/superadmin/${userId}/unblock`, {
        method: 'PATCH',
        headers: {
          'X-CSRF-TOKEN': csrf,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Unblocked!',
        text: `You have successfully Unblocked ${adminName}`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/lists';
      });
    }
  });
}

function toAddAdmin() {
  const fname = document.getElementById('fnameV2').value;
  const lname = document.getElementById('lnameV2').value;
  swal({
    title: 'Are you sure?',
    text: `Do you want to make ${fname} ${lname} an admin ?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      document.getElementById('adminForm').submit();
    }
  });
}

function toDelete(userId, adminName, csrf) {
  swal({
    title: `Are you sure you want to delete ${adminName}?`,
    type: 'error',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No.',
  }).then(async (result) => {
    if (result.value) {
      await fetch(`/v1/superadmin/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      swal({
        title: 'Deleted!',
        text: `You have successfully deleted ${adminName} from TalentPool platform`,
        type: 'success',
      }).then(() => {
        window.location = '/admin/lists';
      });
    }
  });
}
