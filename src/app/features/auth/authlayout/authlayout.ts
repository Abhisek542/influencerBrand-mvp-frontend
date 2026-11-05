import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Mascot } from '../../../shared/components/mascot/mascot';

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet,RouterLink,CommonModule,Mascot],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css',
})
export class Authlayout {

}
