import ammonite.ops._
val file = pwd / "data" / "qgis-localization-marathi-strings.tsv"
val l = read.lines(file)
val arrs = l.map(_.split("\t"))

import $ivy.`com.lihaoyi::ujson:0.6.5`
import ujson.Js

def targ(a: Array[String]): String = if (a.size > 2) a(2) else ""
def st(a: Array[String]): String = if (a.size > 1) a(1) else ""


def obj(a: Array[String]) =
  Js.Obj(
    "location" -> a(0),
    "string" -> st(a),
    "target" -> targ(a)
  )
val obs = arrs.map(obj)
val jsout = ujson.write(jsarr, 2)
write(pwd / "data" / "qgis.json", jsout)
