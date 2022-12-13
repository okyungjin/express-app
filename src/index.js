import { go } from 'fxjs'
import { $qs } from 'fxdom';


go(
  [1, 2, 3, 4],
  console.log,
);

go(
  $qs('body'),
  console.log,
)
