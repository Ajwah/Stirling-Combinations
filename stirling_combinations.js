//Credit: http://blogs.msdn.com/b/oldnewthing/archive/2014/03/24/10510315.aspx
function Stirling(n, k, f) {
 if (n == 0 && k == 0) { f([]); return; }
 if (n == 0 || k == 0) { return; }
 Stirling(n-1, k-1, function(s) {
  f(s.concat([[n]])); // append [n] to the array
 });
 Stirling(n-1, k, function(s) {
  for (var i = 0; i < k; i++) {
   f(s.map(function(t, j) { // append n to the i'th subarray
    return t.concat(i == j ? n : []);
   }));
  }
 });
}

function logToConsole(s) {
  console.log(JSON.stringify(s));
}

function getSecondStirling(items, boxes) {
  var acc = [], r;
  function accumulate(e) {
    acc.push(e.map(function(el){
      return el.map(function(i){
        return arr[i-1];
      });
    }));
  }

  function cyclo(arr) {
  return arr.reduce(
    function(c,e,i){
      c.push(arr.slice(i).concat(arr.slice(0,i)));
      return c;
    }, []);
  }

  function g(acc, items, boxes) {
    return cyclo(boxes).map(function(cBoxes) {
      var res = acc.filter(function(lst){
        return lst.reduce(function(c, arr, i){
          return c && (arr.reduce(function(s,v){
            return s + v}, 0) === cBoxes[i])}, true);
      });
    return res;
    });
  }
  Stirling(items.length, boxes.length, accumulate);
  r = (g(acc, items, boxes)).filter(function(el){return el.length > 0})
                    .reduce(function(c,el){c = c.concat(el); return c}, []);
  return r;
}

function printSolutions(stirling) {
  console.log('   Processing........ ');
  if (stirling.length === 0) {
    console.log('   There are zero solutions.');
  } else {
    console.log('   There are in total: ', stirling.length,' solutions as follows: ');
  }
  stirling.forEach(function(e, i){
    console.log('   =================SOLUTION ', i + 1,'===============');
    console.log('   ', e);
    e.forEach(function(q){
      console.log('            ', q, '===>', q.reduce(function(s,v) {
        return s + v}, 0));
    });
  });
}

var arr  = [10,20,30,40,50,60,70,80,90];
var arr2 = [100,120,140, 90];
var stirling = getSecondStirling(arr, arr2);
console.log('Processing: ', arr, arr2);
printSolutions(stirling);

var arr  = [10,20,30,40,50,60,70,80];
var arr2 = [100,120,140];
var stirling = getSecondStirling(arr, arr2);
console.log('Processing: ', arr, arr2);
printSolutions(stirling);
