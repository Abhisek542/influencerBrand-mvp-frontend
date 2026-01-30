import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css',
})
export class Authlayout {

}
