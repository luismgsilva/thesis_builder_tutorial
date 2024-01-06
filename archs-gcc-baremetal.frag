{
  "sources": {},
  "tasks": {
  "archs-gcc-baremetal": {
      "description": "Task responsible to configure and build ARC-Toolchain for ARCHS CPU.",
      "pre_condition": "test -d $var(@SOURCE)/arc-gnu-toolchain/.git",
      "execute": [
        "$var(@SOURCE)/arc-gnu-toolchain/configure --prefix=$var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION) --target=arc --with-cpu=archs --disable-werror",
        "make -j$var(NJOBS)",
        "mkdir -p $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/patches",
        "ruby $var(@CONFIG_SOURCE_PATH)/scripts/versions.rb -f $var(@WORKSPACE)/config.log -newlib -n $var(@BUILDNAME) -op $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/patches > $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/$var(@BUILDNAME).json",
        "cp $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/$var(@BUILDNAME).json $var(@WORKSPACE)",
        "mkdir -p $var(MOD_PREFIX)/$var(@BUILDNAME)",
        "erb prefix=$var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION) name=$var(@BUILDNAME) arch=ARC $var(@CONFIG_SOURCE_PATH)/module/toolchain.erb > $var(MOD_PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)",
        "erb version=$var(MOD_VERSION) $var(@CONFIG_SOURCE_PATH)/module/default.erb > $var(MOD_PREFIX)/$var(@BUILDNAME)/.version"
      ]
    }
  }
}
