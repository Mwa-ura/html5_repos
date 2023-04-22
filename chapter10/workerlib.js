// Compute one row of data of the Mandelbrot Set
function computeRow(task) {
   var iter = 0;
   var c_i = task.i;
   var max_iter = task.max_iter;
   var escape = task.escape * task.escape;
   task.values = [];
   // Loop 2x in each row of the display
   for (var i = 0; i < task.width; i++) {
        var c_r = task.r_min + (task.r_max - task.r_min) * i/task.width;
        var z_r = 0, z_i = 0;
   
      // Find the right value for the pixel
      for (iter = 0; z_r*z_r + z_i*z_i < escape && iter < max_iter; iter++) {
      // z -> z^2 + c
         var temp = z_r * z_r - z_i * z_i + c_r;
         z_i = 2 * z_r * z_i + c_i;
         z_r = temp;
      }
      if (iter == max_iter) {
         iter = -1;
      }
      // Add named values in an array
      task.values.push(iter);
   }
   return task;  
}
