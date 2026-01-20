<template>
  <span>WEBHOOK</span>
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th></th>
          <th>Titulo</th>
          <th>URL</th>
          <th>Metodo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <div class="flex gap-1">
              <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">A</div>
              <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">B</div>
              <div class="w-6 h-6 border border-gray-400 rounded-full bg-white flex items-center justify-center">C</div>
            </div>
          </th>
          <th>Disparo UnixForm</th>
          <th>http://unixform.com.br</th>
          <th>
            <span class="bg-purple-400  rounded-full h-6 w-[100px] flex items-center px-2">POST</span>
          </th>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr>
          <th>Titulo</th>
          <th>URL</th>
          <th>Metodo</th>
          <th></th>
        </tr>
      </tfoot> -->
    </table>
  </div>
</template>