export default function clientDep() {
  console.trace('__client_dep_trace__')
  console.log(new Error("__client_dep_error__"))
}
