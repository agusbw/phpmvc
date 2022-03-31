document.addEventListener('DOMContentLoaded', function() {

    const editButtons = document.getElementsByClassName('tampilModalUbah');

    document.getElementById('tombolTambahData').addEventListener('click',function(){
        document.getElementById('actionUbah').setAttribute('action', 'http://localhost/phpmvc/public/mahasiswa/tambah');
        const judulModalLabel = document.getElementById('judulModalLabel');
        judulModalLabel.innerHTML = 'Tambah Data Mahasiswa';

        const  tombolUbahData = document.getElementById('tombolUbahData');
        tombolUbahData.innerHTML = 'Tambah Data';

        document.getElementById('nama').removeAttribute('value');
        document.getElementById('nim').removeAttribute('value');
        document.getElementById('email').removeAttribute('value');
        document.getElementById('jurusan').removeAttribute('value');
        document.getElementById('selectedDefault').setAttribute('selected', true);

    })

    function editButtonFunction() {
        Array.from(editButtons).forEach(function(editButton) {
            editButton.addEventListener('click', function(){
                // ambil dom
                const judulModalLabel = document.getElementById('judulModalLabel');
                judulModalLabel.innerHTML = 'Ubah Data Mahasiswa';
                const  tombolUbahData = document.getElementById('tombolUbahData');
                tombolUbahData.innerHTML = 'Ubah Data';
                const id = this.dataset.id;

                console.log("OK");
        
                // ajax
                let http = new XMLHttpRequest();
        
                let data = {
                    id : id
                };
        
                http.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let mhs = JSON.parse(this.response);
                        document.getElementById('nama').setAttribute('value', mhs.nama);
                        document.getElementById('nim').setAttribute('value', mhs.nim);
                        document.getElementById('email').setAttribute('value', mhs.email);
                        document.getElementById('id').setAttribute('value', mhs.id);
                        document.getElementById('selectedDefault').removeAttribute('selected');
                        const options = document.getElementById('jurusan').children;
                        for(let i = 0; i<5; i++){
                            if (options[i].value === mhs.jurusan) {
                                options[i].setAttribute('selected',true);
                            }
                        }
                    }
                };  
        
                http.open('POST', 'http://localhost/phpmvc/public/mahasiswa/getUbah', true);
                http.send(JSON.stringify(data));
        
                // ganti action
                document.getElementById('actionUbah').setAttribute('action', 'http://localhost/phpmvc/public/mahasiswa/ubah');

            })
        
        });
    
    }
    
    editButtonFunction();

    const cariNama = document.getElementById('cariNama');
    cariNama.addEventListener('keyup', function(){
        // ajax
        let http = new XMLHttpRequest();
        
        let keyword = this.value;
        let data = {
            keyword : keyword
        };

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let mhs = JSON.parse(this.response);
                const daftarMahasiswa = document.getElementById('daftarMahasiswa');
                let html = '';
                if (mhs.length > 0) {
                    for (let i = 0; i < mhs.length; i++) {
                        html += '<li class="list-group-item ">';
                        html += '<a href="http://localhost/phpmvc/public/mahasiswa/hapus/'+mhs[i].id+'" class="badge badge-danger float-right" onclick="return confirm('+'Yakin?'+');">hapus</a>'
                        html += '<a href="" class="badge badge-success float-right mr-1 tampilModalUbah" data-toggle="modal" data-target="#formModal" data-id="'+mhs[i].id+'">edit</a>'
                        html += '<a href="http://localhost/phpmvc/public/mahasiswa/detail/'+mhs[i].id+'" class="badge badge-primary float-right mr-1">detail</a>'
                        html += mhs[i].nama;
                        html += '</li>'
                    }
                }else{
                    html += '<li class="list-group-item ">Mahasiswa Tidak Ditemukan</li>'
                }

                daftarMahasiswa.innerHTML = html;

                editButtonFunction();
            }
        };  

        http.open('POST', 'http://localhost/phpmvc/public/mahasiswa/getKeyword', true);;
        http.send(JSON.stringify(data));

    })


});