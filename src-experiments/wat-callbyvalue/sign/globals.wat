(module
  (export "D" (global $D))
  (export "D2" (global $D2))
  (export "X" (global $X))
  (export "Y" (global $Y))
  (export "I" (global $I))
  (export "L" (global $L))

  (global $D i32 (i32.const 0)) ;; 16 x i64 = 128B
  (data (i32.const 0)
    "\a3\78\00\00\00\00\00\00\59\13\00\00\00\00\00\00\ca\4d\00\00\00\00\00\00\eb\75\00\00\00\00\00\00"
    "\ab\d8\00\00\00\00\00\00\41\41\00\00\00\00\00\00\4d\0a\00\00\00\00\00\00\70\00\00\00\00\00\00\00"
    "\98\e8\00\00\00\00\00\00\79\77\00\00\00\00\00\00\79\40\00\00\00\00\00\00\c7\8c\00\00\00\00\00\00"
    "\73\fe\00\00\00\00\00\00\6f\2b\00\00\00\00\00\00\ee\6c\00\00\00\00\00\00\03\52\00\00\00\00\00\00"
  )
	
  (global $D2 i32 (i32.const 128)) ;; 16 x i64 = 128B
	(data (i32.const 128)
    "\59\f1\00\00\00\00\00\00\b2\26\00\00\00\00\00\00\94\9b\00\00\00\00\00\00\d6\eb\00\00\00\00\00\00"
    "\56\b1\00\00\00\00\00\00\83\82\00\00\00\00\00\00\9a\14\00\00\00\00\00\00\e0\00\00\00\00\00\00\00"
    "\30\d1\00\00\00\00\00\00\f3\ee\00\00\00\00\00\00\f2\80\00\00\00\00\00\00\8e\19\00\00\00\00\00\00"
    "\e7\fc\00\00\00\00\00\00\df\56\00\00\00\00\00\00\dc\d9\00\00\00\00\00\00\06\24\00\00\00\00\00\00"
  )
	
  (global $X i32 (i32.const 256)) ;; 16 x i64 = 128B
	(data (i32.const 256)
    "\1a\d5\00\00\00\00\00\00\25\8f\00\00\00\00\00\00\60\2d\00\00\00\00\00\00\56\c9\00\00\00\00\00\00"
    "\b2\a7\00\00\00\00\00\00\25\95\00\00\00\00\00\00\60\c7\00\00\00\00\00\00\2c\69\00\00\00\00\00\00"
    "\5c\dc\00\00\00\00\00\00\d6\fd\00\00\00\00\00\00\31\e2\00\00\00\00\00\00\a4\c0\00\00\00\00\00\00"
    "\fe\53\00\00\00\00\00\00\6e\cd\00\00\00\00\00\00\d3\36\00\00\00\00\00\00\69\21\00\00\00\00\00\00"
  )
	
  (global $Y i32 (i32.const 384)) ;; 16 x i64 = 128B
	(data (i32.const 384)
    "\58\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00"
    "\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00"
    "\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00"
    "\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00\66\66\00\00\00\00\00\00"
  )
	
  (global $I i32 (i32.const 512)) ;; 16 x i64 = 128B
	(data (i32.const 512)
    "\b0\a0\00\00\00\00\00\00\0e\4a\00\00\00\00\00\00\27\1b\00\00\00\00\00\00\ee\c4\00\00\00\00\00\00"
    "\78\e4\00\00\00\00\00\00\2f\ad\00\00\00\00\00\00\06\18\00\00\00\00\00\00\43\2f\00\00\00\00\00\00"
    "\a7\d7\00\00\00\00\00\00\fb\3d\00\00\00\00\00\00\99\00\00\00\00\00\00\00\4d\2b\00\00\00\00\00\00"
    "\0b\df\00\00\00\00\00\00\c1\4f\00\00\00\00\00\00\80\24\00\00\00\00\00\00\83\2b\00\00\00\00\00\00"
  )
	
  (global $L i32 (i32.const 640)) ;; 32 x i64 (= scalar) = 256B
	(data (i32.const 640)
    "\ed\00\00\00\00\00\00\00\d3\00\00\00\00\00\00\00\f5\00\00\00\00\00\00\00\5c\00\00\00\00\00\00\00"
    "\1a\00\00\00\00\00\00\00\63\00\00\00\00\00\00\00\12\00\00\00\00\00\00\00\58\00\00\00\00\00\00\00"
    "\d6\00\00\00\00\00\00\00\9c\00\00\00\00\00\00\00\f7\00\00\00\00\00\00\00\a2\00\00\00\00\00\00\00"
    "\de\00\00\00\00\00\00\00\f9\00\00\00\00\00\00\00\de\00\00\00\00\00\00\00\14\00\00\00\00\00\00\00"
    "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
    "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
    "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"
    "\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00"
  )
)