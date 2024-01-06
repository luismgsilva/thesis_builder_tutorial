{
  "sources": {
    "arc-qemu": {
      "repo": "https://github.com/foss-for-synopsys-dwc-arc-processors/qemu.git"
    }
  },
  "tasks": {
    "arc-qemu": {
      "description": "Task responsible to configure and build ARC QEMU.",
      "pre_condition": "test -d $var(@SOURCE)/arc-qemu/.git",
      "execute": [
        "$var(@SOURCE)/arc-qemu/configure --prefix=$var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION) --target-list=arc-softmmu,arc-linux-user,arc64-softmmu,arc64-linux-user",
        "make -j$var(NJOBS) && make install",
        "mkdir -p $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/patches",
        "ruby $var(@CONFIG_SOURCE_PATH)/scripts/versions.rb -f $var(@WORKSPACE)/config.log -n $var(@BUILDNAME) -op $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/patches > $var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)/qemu.json",
        "mkdir -p $var(MOD_PREFIX)/$var(@BUILDNAME)",
        "erb prefix=$var(PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION) name=$var(@BUILDNAME) $var(@CONFIG_SOURCE_PATH)/module/qemu.erb > $var(MOD_PREFIX)/$var(@BUILDNAME)/$var(MOD_VERSION)",
	"erb version=$var(MOD_VERSION) $var(@CONFIG_SOURCE_PATH)/module/default.erb > $var(MOD_PREFIX)/$var(@BUILDNAME)/.version"
      ]
    }
  }
}
