class CountableSet<K> extends Set<K> {
  _map: Map<K, number>

  constructor(values?: Iterable<K>) {
    super(values)
    this._map ??= new Map()
  }

  add(key: K) {
    this._map ??= new Map()
    this._map.set(key, (this._map.get(key) ?? 0) + 1)
    return super.add(key)
  }
}

console.log(new CountableSet(["foo"]))
