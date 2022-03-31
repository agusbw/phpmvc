<div class="container mt-3">
  <div class="row">
    <div class="col-lg-g">
      <?php 
        Flasher::Flash();
      ?>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-6 mb-3">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal" id="tombolTambahData">
        Tambah Data Mahasiswa
        </button>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-6">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Cari nama..." id="cariNama">
      </div>
    </div>
  </div>
  <div class="row">
      <div class="col-lg-6">
          <h3>Daftar Mahasiswa</h3>
          <ul class="list-group" id="daftarMahasiswa">
          <?php foreach($data['mhs'] as $mhs): ?>
              <li class="list-group-item ">
                  <a href="<?=BASEURL;?>/mahasiswa/hapus/<?=$mhs['id']?>" class="badge badge-danger float-right" onclick="return confirm('Yakin?');">hapus</a>
                  <a href=" " class="badge badge-success float-right mr-1 tampilModalUbah" data-toggle="modal" data-target="#formModal" data-id="<?= $mhs['id'] ?>">edit</a>
                  <a href="<?=BASEURL;?>/mahasiswa/detail/<?=$mhs['id']?>" class="badge badge-primary float-right mr-1">detail</a>
                  <?= $mhs['nama'] ?>
              </li>
          <?php endforeach; ?>
          </ul>   
      </div>
  </div>
</div>

<!-- Modal -->

<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="judulModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="judulModalLabel">Tambah Data Mahasiswa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form action="<?=BASEURL;?>/mahasiswa/tambah" method="post" id="actionUbah">
          <input type="hidden" name="id" id="id">

          <div class="form-group">
            <label for="nama">Nama</label>
            <input type="text" class="form-control" id="nama" name="nama" autocomplete="off" required>
          </div>

          <div class="form-group">
            <label for="nim">NIM</label>
            <input type="number" class="form-control" id="nim" name="nim" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>

          <div class="form-group">
          <label for="jurusan">Jurusan</label>
            <select class="form-control" id="jurusan" name="jurusan" required>
              <option disabled value id="selectedDefault"> -- select an option -- </option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Bisnis Digital">Bisnis Digital</option>
              <option value="Teknik Komputer">Teknik Komputer</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
            </select>
          </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" id="tombolUbahData" >Tambah Data</button>
          </form>
      </div>
    </div>
  </div>
</div>