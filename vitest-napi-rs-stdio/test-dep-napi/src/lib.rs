use napi_derive::napi;

#[napi]
pub fn test_log(message: String) {
  println!("{}", message);
}
